const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 400
};

const updateCartItems = (cartItems, item, idx) => {
  if (idx === -1) {
    return [
      ...cartItems,
      item
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

const updateCartItem = (book, item = {} ) => {

  const { id = book.id, count = 0, title = book.title, total = 0 } = item;

  return {
    id,
    title,
    count: count + 1,
    total: total + book.price
  }

};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };

    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find((item, idx) => item.id === bookId);
      const itemIndex = state.cartItems.findIndex(item => item.id === bookId);
      const item = state.cartItems[itemIndex];

      const newItem = updateCartItem(book, item);

      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
      };

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const bookIdx = state.cartItems.findIndex(({id}) => id === action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter((item, idx) => idx !== bookIdx)
      };

    case 'BOOK_REMOVED_FROM_CART':
      const orderBook = state.cartItems.find(({id}) => id === action.payload);
      if (orderBook.count === 1) {
        return state;
      }

      const orderIdx = state.cartItems.findIndex(({id}) => id === action.payload);
      const newOrder = {
        ...orderBook,
        count: orderBook.count - 1,
        total: orderBook.total - orderBook.total / orderBook.count
      };

      return {
        ...state,
        cartItems: [
          ...state.cartItems.slice(0, orderIdx),
          newOrder,
          ...state.cartItems.slice(orderIdx + 1)
        ]
      };

    default:
      return state;
  }

};

export default reducer;