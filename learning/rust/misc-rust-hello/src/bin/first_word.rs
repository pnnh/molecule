fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear();

    println!("{}", word);

    let s2 = String::from("hello world");
    let hello = &s2[0..5];
    let world = &s2[6..11];

    println!("{} {}", hello, world);

    let slice1 = &s2[..2];
    let slice2 = &s2[3..];
    let slice3 = &s2[..];
    println!("{}|{}|{}", slice1, slice2, slice3);

    let s3 = String::from("hello world");

    let word2 = first_word2(&s3);
    println!("the first word is 2: {}", word2);

    let word3 = first_word3(&s3[..]);
    let my_string_literal = "hello world";
    let word4 = first_word3(my_string_literal);
    println!("the first word is 3: {}|{}", word3, word4);
}

fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == ' ' as u8 {
            return i;
        }
    }
    s.len()
}

fn first_word2(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == ' ' as u8 {
            return &s[0..i];
        }
    }
    &s[..]
}

fn first_word3(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == ' ' as u8 {
            return &s[0..i];
        }
    }
    &s[..]
}
