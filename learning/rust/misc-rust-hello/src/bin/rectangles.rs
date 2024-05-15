#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width || self.height > other.height
    }

    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

impl Rectangle {
    fn area2(&self) -> u32 {
        self.area()
    }
}

fn main() {
    let width1 = 30;
    let height1 = 50;

    println!(
        "The area of the rectangle is {} square pixels.",
        area(width1, height1)
    );

    let rect1 = (30, 50);
    println!(
        "The area of the rectangle is {} square pixels.",
        area2(rect1)
    );

    let rect2 = Rectangle {
        width: 30,
        height: 50,
    };
    println!(
        "The area of the rectangle is {} square pixels.",
        area3(&rect2)
    );

    println!("rect2 is {:?} {:#?}", rect2, rect2);

    println!(
        "The area of the rectangle is {} square pixels.",
        rect2.area()
    );

    let rect3 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect4 = Rectangle {
        width: 60,
        height: 45,
    };
    println!("Can rect3 hold rect4? {}", rect3.can_hold(&rect4));

    let sq = Rectangle::square(3);
}

fn area(x: u32, y: u32) -> u32 {
    x * y
}

fn area2(dimensions: (u32, u32)) -> u32 {
    dimensions.0 * dimensions.1
}

fn area3(rect: &Rectangle) -> u32 {
    rect.width * rect.height
}
