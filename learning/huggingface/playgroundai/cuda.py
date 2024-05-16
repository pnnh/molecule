import torch

print("device_count", torch.cuda.device_count())

if torch.cuda.is_available():
    print("GPU可用")
else:
    print("GPU不可用")