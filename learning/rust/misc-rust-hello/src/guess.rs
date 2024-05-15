

pub mod guess_mod {
    use std::io;
    use rand::Rng;
    use ferris_says::say;
    use std::cmp::Ordering;
    use std::cmp::Ordering::Equal;
    use std::io::{stdout, BufWriter, Read};
    use libc::{printf, pselect};

    pub fn guess_number() {
        let x = 5;
        // x = 6;      // 将编译出错，不可变变量无法再次赋值
        println!("Guess the number!");
        let mut y = 5;
        y = 6;      // 可以编译通过

        let secret_number = rand::thread_rng().gen_range(1..101);
        //println!("The secret number is: {}", secret_number);

        loop {
            println!("Please input your guess.");

            let mut guess = String::new();
            io::stdin().read_line(&mut guess).expect("Failed to read line");

            //let guess: u32 = guess.trim().parse().expect("Please type a number");
            let guess: u32 = match guess.trim().parse() {
                Ok(num) => num,
                Err(_) => continue,
            };
            println!("You guessed: {}", guess);

            match guess.cmp(&secret_number) {
                Ordering::Less => println!("Too small!"),
                Ordering::Greater => println!("Too big!"),
                Ordering::Equal => {
                    println!("You win!");
                    break;
                }
            }
        }
    }
}