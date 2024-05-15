fn main() {
    let v: Vec<i32> = Vec::new();
    let v2 = vec![1, 2, 3, 4, 5];
    let mut v3 = Vec::new();
    v3.push(5);
    v3.push(6);
    v3.push(7);

    let third: &i32 = &v2[2];

    println!("The tihrd element is {}", third);
    match v2.get(2) {
        Some(third) => println!("The tihrd element is {}", third),
        None => println!("There is no tihrd element."),
    }

    for i in &v2 {
        println!("{}", i);
    }

    for i in &mut v3 {
        *i += 50;
    }

    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Text(String::from("bue")),
        SpreadsheetCell::Float(10.12),
    ];
}

enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}
