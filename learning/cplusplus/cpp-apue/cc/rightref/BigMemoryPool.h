//
// Created by Larry on 2022/1/3.
//

#ifndef APUE_BIGMEMORYPOOL_H
#define APUE_BIGMEMORYPOOL_H

#include <iostream>

class BigMemoryPool {
 public:
  static const int PoolSize = 4096;
  BigMemoryPool();
  ~BigMemoryPool();

  BigMemoryPool(BigMemoryPool&& other) noexcept ;
  BigMemoryPool(const BigMemoryPool& other);

  BigMemoryPool& operator=(BigMemoryPool&& other);
 private:
  char *pool_;
};

BigMemoryPool get_pool(const BigMemoryPool& pool);
BigMemoryPool make_pool();
void move_pool(BigMemoryPool&& pool);

#endif //APUE_BIGMEMORYPOOL_H
