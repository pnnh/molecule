mod front_of_house;
mod guess;
pub mod run;
mod string;

use std::io;
use rand::Rng;
use ferris_says::say;
use std::cmp::Ordering;
use std::cmp::Ordering::Equal;
use std::io::{stdout, BufWriter, Read};
use libc::{printf, pselect};

pub use crate::front_of_house::hosting;
//pub use crate::run::run_mod;
pub use crate::guess::guess_mod;

extern crate libc;

extern {
    fn list_file(input: libc::c_int) -> libc::c_int;
}

const MAX_POINTS: u32 = 100_000;

fn run_say() {
    let x = 5;
    let y = 10;
    println!("x = {} and y = {}", x, y);
    let stdout = stdout();
    let message = String::from("Hello fellow Rustaceans!");
    let width = message.chars().count();

    let mut writer = BufWriter::new(stdout.lock());
    say(message.as_bytes(), width, &mut writer).unwrap();

    let input = 4;
    let output = unsafe { list_file(input) };
    println!("{} * 2 = {}", input, output);
}


fn main() {
    println!("Hello, world!");

    // run_say();
    // guess_mod::guess_number();
    // run_mod::run_tuple();
    // run_mod::run_array(7);
    // println!("{} {}", run_mod::run_five(), run_mod::plus_one(1));
    // run_mod::run_if(8);
    // run_mod::run_loop();
    //run::run_iter();
    // hosting::add_to_waitlist();

    string::run_main();
}
