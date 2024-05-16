尝试在NVIDIA A10 GPU上运行，结果提示内存不足没有成功

```bash
(base) azureuser@mverse :: learning/huggingface/playgroundai ‹main*› » python texttoimage.py
/home/azureuser/.pyenv/versions/3.10.13/lib/python3.10/site-packages/huggingface_hub/file_download.py:1132: FutureWarning: `resume_download` is deprecated and will be removed in version 1.0.0. Downloads always resume when possible. If you want to force a new download, use `force_download=True`.
  warnings.warn(
Loading pipeline components...: 100%|█████████████████████████████████████████████████████████████████████████| 7/7 [00:05<00:00,  1.36it/s]
Traceback (most recent call last):
  File "/home/azureuser/Projects/multiverse/learning/huggingface/playgroundai/texttoimage.py", line 8, in <module>
    ).to("cuda")
  File "/home/azureuser/.pyenv/versions/3.10.13/lib/python3.10/site-packages/diffusers/pipelines/pipeline_utils.py", line 418, in to
    module.to(device, dtype)
  File "/home/azureuser/.pyenv/versions/3.10.13/lib/python3.10/site-packages/torch/nn/modules/module.py", line 1173, in to
    return self._apply(convert)
  File "/home/azureuser/.pyenv/versions/3.10.13/lib/python3.10/site-packages/torch/nn/modules/module.py", line 779, in _apply
    module._apply(fn)
  File "/home/azureuser/.pyenv/versions/3.10.13/lib/python3.10/site-packages/torch/nn/modules/module.py", line 779, in _apply
    module._apply(fn)
  File "/home/azureuser/.pyenv/versions/3.10.13/lib/python3.10/site-packages/torch/nn/modules/module.py", line 779, in _apply
    module._apply(fn)
  [Previous line repeated 6 more times]
  File "/home/azureuser/.pyenv/versions/3.10.13/lib/python3.10/site-packages/torch/nn/modules/module.py", line 804, in _apply
    param_applied = fn(param)
  File "/home/azureuser/.pyenv/versions/3.10.13/lib/python3.10/site-packages/torch/nn/modules/module.py", line 1159, in convert
    return t.to(
torch.cuda.OutOfMemoryError: CUDA out of memory. Tried to allocate 20.00 MiB. GPU 
(base) azureuser@mverse :: learning/huggingface/playgroundai ‹main*› »                    

```