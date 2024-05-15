extern crate cc;

fn main() {
    cc::Build::new()
        .file("src/list_file.c")
        .compile("liblist_file");
}