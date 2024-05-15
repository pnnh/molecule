struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn build_user(email: String, username: String) -> User {
    User {
        email: email,
        username: username,
        active: true,
        sign_in_count: 1,
    }
}

fn build_user2(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}

struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    println!("firstbin");
    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    println!("user {}", user1.email);
    user1.email = String::from("another@example.com");
    println!("user {}", user1.email);

    let user2 = User {
        email: String::from("another2@example.com"),
        username: String::from("anotherusername567"),
        active: user1.active,
        sign_in_count: user1.sign_in_count,
    };
    let user3 = User {
        email: String::from("another3@example.com"),
        username: String::from("anotherusername567"),
        ..user1
    };
    println!("user {} {}", user2.email, user3.email);

    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
