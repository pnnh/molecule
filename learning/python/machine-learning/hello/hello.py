import tensorflow as tf

tf.compat.v1.disable_eager_execution()
x = [0.0, -1.0, 2.0, 3.0]
softmax_x = tf.nn.softmax(x)
session = tf.compat.v1.Session()
print("x:", x)
print("softmax_x:", session.run(softmax_x))
