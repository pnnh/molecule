fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1);

    let s3 = String::from("hello");
    let len3 = calculate_length2(&s3);
    println!("The length of 3 '{}' is {}", s3, len3);

    change(&s3);

    let mut s4 = String::from("hello");
    let r1 = &mut s4;
    let r2 = &mut s4;
    change_mut(&mut s4);

    //let reference_to_nothing = dangle(); // 将编译出错
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len();
    (s, length)
}

fn calculate_length2(s: &String) -> usize {
    s.len()
}

fn change(some_string: &String) {
    // some_string.push_str("world");      // 将编译出错，无法修改引用的值
}

fn change_mut(some_string: &mut String) {
    // some_string.push_str("world");      // 将编译出错，无法修改引用的值
}

fn dangle() -> &String {
    let s = String::from("hello");
    &s
}
