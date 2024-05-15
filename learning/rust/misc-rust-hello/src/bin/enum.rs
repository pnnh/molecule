enum IpAddrKind {
    V4,
    V6,
}

fn route(ip_type: IpAddrKind) {}

struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

enum IpAddrString {
    V4(String),
    V6(String),
}

enum IpAddrInt {
    V4(u8, u8, u8, u8),
    V6(String),
}

struct Ipv4Addr {}
struct Ipv6Addr {}

enum IpAddrStruct {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) {}
}

#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u32 {
    let mut count = 0;
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        // Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        }
        _ => count += 1,
    }
}

fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn main() {
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;

    route(four);
    route(six);

    let home = IpAddr {
        kind: IpAddrKind::V4,
        address: String::from("127.0.0.1"),
    };
    let loopback = IpAddr {
        kind: IpAddrKind::V6,
        address: String::from("::1"),
    };
    let home2 = IpAddrString::V4(String::from("127.0.0.0"));
    let loopback2 = IpAddrString::V6(String::from("::1"));

    let home3 = IpAddrInt::V4(127, 0, 0, 1);
    let loopback3 = IpAddrInt::V6(String::from("::1"));

    let m = Message::Write(String::from("hello"));
    m.call();

    let some_number = Some(5);
    let some_string = Some("a string");
    let absent_number: Option<i32> = None;

    let x: i8 = 5;
    let y: Option<i8> = Some(5);
    // let sum = x + y;        // 编译错误，整型和可选类型无法直接向加

    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);

    let some_u8_value = 0u8;
    match some_u8_value {
        1 => println!("one"),
        3 => println!("three"),
        5 => println!("five"),
        7 => println!("seven"),
        _ => (), // 其它未匹配情况
    }

    if let Some(3) = some_u8_value {
        println!("three");
    }
}
