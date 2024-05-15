获取当前分支的修订版本号
git rev-parse HEAD

git submodule sync —recursive 
 git submodule update --init —recursive


撤销修改
git reset --hard



移除子模块步骤
# Remove the submodule entry from .git/config
git submodule deinit -f path/to/submodule

# Remove the submodule directory from the superproject's .git/modules directory
rm -rf .git/modules/path/to/submodule

# Remove the entry in .gitmodules and remove the submodule directory located at path/to/submodule
git rm -f path/to/submodule
