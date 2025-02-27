<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Order Details</h1>
    <p><strong>Order ID:</strong> {{ $order->id }}</p>
    <p><strong>Name:</strong> {{ $order->name }}</p>
    <p><strong>Address:</strong> {{ $order->rec_address }}</p>
    <p><strong>Phone:</strong> {{ $order->phone }}</p>
    <p><strong>Status:</strong> {{ $order->status }}</p>

    <h2>Products</h2>
    <table>
        <thead>
            <tr>
                <th>Product Title</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>

                <tr>
                    <td>{{ $order->product->title }}</td>
                    <td><img src='public/{{$order->product->image_url}}' ></td>
                    <td>${{ number_format($order->product->price, 2) }}</td>

                </tr>

        </tbody>
    </table>
</body>
</html>
