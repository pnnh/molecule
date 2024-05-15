#include <boost/asio.hpp>
#include <boost/shared_ptr.hpp>
#include <boost/thread.hpp>
#include <boost/thread/mutex.hpp>
#include <boost/bind.hpp>
#include <iostream>

boost::mutex global_stream_lock;

void WorkerThread(boost::shared_ptr<boost::asio::io_service> iosvc, int counter) {
  global_stream_lock.lock();
  std::cout << "Thread " << counter << " Start." << std::endl;
  global_stream_lock.unlock();

  try {
    boost::system::error_code ec;
    iosvc->run(ec);

    if (ec) {
      global_stream_lock.lock();
      std::cout << "Message: " << ec << std::endl;
      global_stream_lock.unlock();
    }

    global_stream_lock.lock();
    std::cout << "Thread " << counter << " End." << std::endl;
    global_stream_lock.unlock();
  } catch (std::exception &e) {
    global_stream_lock.lock();
    std::cout << "Message: " << e.what() << std::endl;
    global_stream_lock.unlock();
  }
}

void ThrowAnException(boost::shared_ptr<boost::asio::io_service> iosvc, int counter) {
  global_stream_lock.lock();
  std::cout << "Throw Exception " << counter << std::endl;
  global_stream_lock.unlock();

  throw (std::runtime_error("The Exception !!!"));
}

void Print(int number) {
  std::cout << "Number: " << number << std::endl;
}

int run_main() {

  boost::shared_ptr<boost::asio::io_service> io_svc(new boost::asio::io_service);

  boost::shared_ptr<boost::asio::io_service::work> worker(new boost::asio::io_service::work(*io_svc));

  global_stream_lock.lock();
  std::cout << "The program will exit once all work has finished.\n";
  global_stream_lock.unlock();

  boost::thread_group threads;
  for (int i = 1; i <= 5; i++) {
    threads.create_thread(boost::bind(&WorkerThread, io_svc, i));
  }
  boost::this_thread::sleep(boost::posix_time::milliseconds(500));

  io_svc->post(boost::bind(&Print, 1));
  io_svc->post(boost::bind(&Print, 2));
  io_svc->post(boost::bind(&Print, 3));
  io_svc->post(boost::bind(&Print, 4));
  io_svc->post(boost::bind(&Print, 5));
  io_svc->post(boost::bind(&ThrowAnException, io_svc, 6));

  worker.reset();

  threads.join_all();
  return 0;
}

int run_main_strand() {

  boost::shared_ptr<boost::asio::io_service> io_svc(new boost::asio::io_service);
  boost::shared_ptr<boost::asio::io_service::work> worker(new boost::asio::io_service::work(*io_svc));
  boost::asio::io_service::strand strand(*io_svc);

  global_stream_lock.lock();
  std::cout << "The program will exit once all work has finished.\n";
  global_stream_lock.unlock();

  boost::thread_group threads;
  for (int i = 1; i <= 5; i++) {
    threads.create_thread(boost::bind(&WorkerThread, io_svc, i));
  }
  boost::this_thread::sleep(boost::posix_time::milliseconds(500));

  strand.post(boost::bind(&Print, 1));
  strand.post(boost::bind(&Print, 2));
  strand.post(boost::bind(&Print, 3));
  strand.post(boost::bind(&Print, 4));
  strand.post(boost::bind(&Print, 5));

  worker.reset();

  threads.join_all();
  return 0;
}

int run_main_strand_wrap() {

  boost::shared_ptr<boost::asio::io_service> io_svc(new boost::asio::io_service);
  boost::shared_ptr<boost::asio::io_service::work> worker(new boost::asio::io_service::work(*io_svc));
  boost::asio::io_service::strand strand(*io_svc);

  global_stream_lock.lock();
  std::cout << "The program will exit once all work has finished.\n";
  global_stream_lock.unlock();

  boost::thread_group threads;
  for (int i = 1; i <= 5; i++) {
    threads.create_thread(boost::bind(&WorkerThread, io_svc, i));
  }

  boost::this_thread::sleep(boost::posix_time::milliseconds(100));
  io_svc->post(strand.wrap(boost::bind(&Print, 1)));
  io_svc->post(strand.wrap(boost::bind(&Print, 2)));

  boost::this_thread::sleep(boost::posix_time::milliseconds(100));
  io_svc->post(strand.wrap(boost::bind(&Print, 3)));
  io_svc->post(strand.wrap(boost::bind(&Print, 4)));

  boost::this_thread::sleep(boost::posix_time::milliseconds(100));
  io_svc->post(strand.wrap(boost::bind(&Print, 5)));
  io_svc->post(strand.wrap(boost::bind(&Print, 6)));

  worker.reset();

  threads.join_all();
  return 0;
}

int main(int argc, char *argv[]) {
  // run_main();

  //run_main_strand();

  run_main_strand_wrap();
}