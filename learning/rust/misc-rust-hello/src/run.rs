
    pub fn run_iter() {
        let a = [10, 20, 30, 40, 50];
        let mut index = 0;

        while index < 5 {
            println!("the value is: {}", a[index]);

            index = index + 1;
        }

        for element in a.iter() {
            println!("the value is: {}", element);
        }

        for number in (1..4).rev() {
            println!("{}", number);
        }
        println!("LIFTOFF!!!");
    }

    pub fn run_tuple() {
        let tup: (i32, f64, u8) = (500, 6.4, 1);

        let (x, y, z) = tup;

        println!("The value of y is {}", y);

        let five_hundred = tup.0;
        let six_point_four = tup.1;
        let one = tup.2;

        println!("{} {} {}", five_hundred, six_point_four, one);
    }

    pub fn run_array(x: i32) {
        let a = [1, 2, 3, 4, 5];
        let first = a[0];
        let second = a[1];
        let index = 10;
        //let element = a[index]; // 将执行出错
        //println!("The value of element is: {}", index);
        println!("{} {} {}", first, second, index);
        let y = {
            let x = 3;
            x + 1
        };
        println!("{}", y);
    }

    pub fn plus_one(x: i32) -> i32 {
        x + 1
    }

    pub fn run_five() -> i32 {
        5
    }

    pub fn run_if(number: i32) {
        let new_number = if number > 0 { 7 } else { 9 };
        if number < 5 {
            println!("condition was true {}", new_number);
        } else {
            println!("condition was false {}", new_number);
        }
    }

    pub fn run_loop() {
        let mut counter = 0;

        let result = loop {
            counter += 1;
            if counter == 10 {
                break counter * 2;
            }
        };
        println!("T result is {}", result);
    }

