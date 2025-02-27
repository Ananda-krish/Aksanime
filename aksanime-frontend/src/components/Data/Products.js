const products = [
    {
      id: 1,
      title: "lipstick ",
      image: "https://via.placeholder.com/150",
      price: 29.99,
      category: "lips",
      buttonText: 'Select Shade',  // Another button text

    },
    {
      id: 2,
      title: "lipstick1",
      image: "https://via.placeholder.com/150",
      price: 49.99,
      category: "lips",
      buttonText: 'Select Shade',  // Another button text
      tag: "classic", // Example tag for non-latest products

    },
    {
      id: 3,
      title: "lipstick 2",
      image: "https://via.placeholder.com/150",
      price: 19.99,
      category: "lips",
      buttonText: 'Select Shade',  // Another button text
      tag: "classic", // Example tag for non-latest products

    },
    {
      id: 4,
      title: "lipstick 3",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "lips",
      buttonText: 'Select Shade',  // Another button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 5,
      title: "lipstick 4",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "lips",
      buttonText: 'Select Shade',  // Another button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 6,
      title: "lipstick 5",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "lips",
      buttonText: 'Select Shade',  // Another button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 7,
      title: "lipstick 6",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "lips",
      buttonText: 'Select Shade',  // Another button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 8,
      title: "Eyeliner 1",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "eyes",
      buttonText: 'Add to Bag',  // Example button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 9,
      title: "Eyeliner 2",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "eyes",
      buttonText: 'Add to Bag',  // Example button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 10,
      title: "Eyeliner 3",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "eyes",
      buttonText: 'Add to Bag',  // Example button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 11,
      title: "Eyeliner 4",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "eyes",
      buttonText: 'Add to Bag',  // Example button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 12,
      title: "Eyeline 5r",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "eyes",
      buttonText: 'Add to Bag',  // Example button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 13,
      title: "Eyeliner 6",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "eyes",
      buttonText: 'Add to Bag',  // Example button text
      tag: "classic", // Example tag for non-latest products

    },{
      id: 14,
      title: "Eyeliner 7",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "eyes",
      buttonText: 'Add to Bag',  // Example button text
      tag: "classic", // Example tag for non-latest products

    },{
      id:15,
      title: "Eyeliner 8",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "eyes",
      buttonText: 'Add to Bag',  // Example button text
      tag: "new", // Tag to indicate it's a new arrival

    },{
      id: 16,
      title: "Eyeliner 9",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "gifting",
      buttonText: 'Add to Bag',  // Example button text
      tag: "classic", // Example tag for non-latest products

    },
    {
      id: 17,
      title: "latest 1",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "gifting",
      buttonText: 'Add to Bag',  // Example button text
      tag: "latest", // Example tag for non-latest products

    },{
      id: 18,
      title: "latest 2",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "accessories",
      buttonText: 'Add to Bag',  // Example button text
      tag: "latest", // Example tag for non-latest products

    },{
      id: 19,
      title: "latest 3",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "accessories",
      buttonText: ' Select Shade',  // Example button text
      tag: "latest", // Example tag for non-latest products

    },{
      id: 20,
      title: "latest 4",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "accessories",
      buttonText: 'Add to Bag',  // Example button text
      tag: "latest", // Example tag for non-latest products

    },{
      id: 21,
      title: "latest 5",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "accessories",
      buttonText: 'Select Shade',  // Example button text
      tag: "latest", // Example tag for non-latest products

    },{
      id: 22,
      title: "latest 6",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "skincare",
      buttonText: 'Add to Bag',  // Example button text
      tag: "latest", // Example tag for non-latest products

    },{
      id: 23,
      title: "latest 7",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "skincare",
      buttonText: 'Add to Bag',  // Example button text
      tag: "latest", // Example tag for non-latest products

    },{
      id: 24,
      title: "latest 8",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "skincare",
      buttonText: 'Select shade',  // Example button text
      tag: "latest", // Example tag for non-latest products

    },
    {
      id: 25,
      title: "New arrival 1",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "skincare",
      buttonText: 'Add to Bag',  // Example button text
      tag: " new", // Example tag for non-latest products

    }, {
      id: 26,
      title: "New arrival 2",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "nails",
      buttonText: 'Add to Bag',  // Example button text
      tag: " new", // Example tag for non-latest products

    },{
      id: 27,
      title: "New arrival 3",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "nails",
      buttonText: 'Add to Bag',  // Example button text
      tag: " new", // Example tag for non-latest products

    },{
      id: 28,
      title: "New arrival 4",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "nails",
      buttonText: 'Select Shade',  // Example button text
      tag: " new", // Example tag for non-latest products

    },{
      id: 29,
      title: "New arrival 5",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "nails",
      buttonText: 'Add to Bag',  // Example button text
      tag: " new", // Example tag for non-latest products

    },{
      id: 30,
      title: "New arrival 6",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "face",
      buttonText: 'Add to Bag',  // Example button text
      tag: " new", // Example tag for non-latest products

    },{
      id: 31,
      title: "New arrival 8",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "face",
      buttonText: 'Add to Bag',  // Example button text
      tag: " new", // Example tag for non-latest products

    },{
      id: 32,
      title: "New arrival 1",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      category: "face",
      buttonText: 'Select Shade',  // Example button text
      tag: " new", // Example tag for non-latest products

    },
  ];
  
  export default products;
  