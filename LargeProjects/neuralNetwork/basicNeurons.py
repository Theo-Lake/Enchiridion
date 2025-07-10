inputs = list(map(float, input().split()))
weights = list(map(float, input().split()))

bias = int(input())

output = sum(i * w for i, w in zip(inputs, weights)) + bias

print(output)