import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const DUMMY_ITEMS = [
    {
      id: "a1",
      title: "Pasta",
      price: 6.99,
      description: "Cooked in Marinara Sauce - amazing!",
    },
    {
      id: "b2",
      title: "Grilled Chicken Salad",
      price: 9.99,
      description:
        "Fresh greens, juicy grilled chicken, and your choice of dressing.",
    },

    {
      id: "c3",
      title: "Beef Burger",
      price: 8.49,
      description:
        "A classic burger with a juicy beef patty, lettuce, tomato, and pickles.",
    },

    {
      id: "d4",
      title: "Veggie Wrap",
      price: 7.99,
      description:
        "A delicious vegetarian option with grilled veggies, hummus, and avocado.",
    },
  ];

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_ITEMS.map((item) => (
          <ProductItem
            key={item.id}
            id = {item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
