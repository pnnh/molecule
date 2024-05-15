use std::collections::HashMap;
//use std::collections::*;

pub fn run_main() {
    let s = String::from("hello");

    takes_ownership(s);

    let x = 5;

    makes_copy(x);
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}

fn makes_copy(some_interger: i32) {
    println!("{}", some_interger);
}

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);

    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let initial_scores = vec![10, 50];
    let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();

    let field_name = String::from("Favorite color");
    let field_value = String::from("Blue");
    let mut map = HashMap::new();
    map.insert(field_name, field_value);
    // field_name和field_value从这一刻开始失效，若尝试使用它们则会导致编译错误

    let mut scores2 = HashMap::new();
    scores2.insert(String::from("Blue"), 10);
    scores2.insert(String::from("Yellow"), 50);

    scores2.entry(String::from("Red")).or_insert(50);
    scores2.entry(String::from("Green")).or_insert(80);

    let team_name = String::from("Blue");
    let score = scores2.get(&team_name);

    for (key, value) in &scores2 {
        println!("{}:{}", key, value);
    }
    println!("{:?}", scores2);

    let text = "hello world wonderful world";
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", map);
}
