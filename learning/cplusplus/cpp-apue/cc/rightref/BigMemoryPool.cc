//
// Created by Larry on 2022/1/3.
//

#include "BigMemoryPool.h"

BigMemoryPool::BigMemoryPool() : pool_(new char[PoolSize]) {

}

BigMemoryPool::~BigMemoryPool() {
  if (pool_ != nullptr) {
    delete[] pool_;
  }
}

BigMemoryPool::BigMemoryPool(BigMemoryPool&& other) noexcept : pool_(new char[PoolSize]) {
  std::cout << "move big memory pool." << std::endl;
  pool_ = other.pool_;
  other.pool_ = nullptr;
}

BigMemoryPool::BigMemoryPool(const BigMemoryPool &other) : pool_(new char[PoolSize]) {
  std::cout << "copy big memory pool." << std::endl;
  memcpy(pool_, other.pool_, PoolSize);
}

BigMemoryPool& BigMemoryPool::operator=(BigMemoryPool&& other) {
  std::cout << "move(operator=) big memory pool." << std::endl;
  if (pool_ != nullptr) {
    delete[] pool_;
  }
  pool_ = other.pool_;
  other.pool_ = nullptr;
  return *this;
}

BigMemoryPool get_pool(const BigMemoryPool& pool) {
  return pool;
}

BigMemoryPool make_pool() {
  BigMemoryPool pool;
  return get_pool(pool);
}

void move_pool(BigMemoryPool&& pool) {
  std::cout << "call move_pool" << std::endl;
  //BigMemoryPool my_pool(static_cast<BigMemoryPool&&>(pool));
  BigMemoryPool my_pool(std::move(pool));
}