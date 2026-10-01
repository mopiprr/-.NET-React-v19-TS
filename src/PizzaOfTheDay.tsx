import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PizzaOfTheDay = () => {
  const pizzaOfTheDay = usePizzaOfTheDay();

  if (!pizzaOfTheDay) {
    return <div>Loading...</div>;
  }

  return (
    // pizza-of-the--day div
    <div className="border-t mt-[50px] w-full"> 
    {/* pizza-of-the-day h2 */}
      <h2 className="text-center">Pizza of the Day</h2>
      <div className="flex items-center justify-center">
        {/* pizza of the day info */}
        <div className="mr-[30px] leading-loose text-center">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>
          {/* pizza of the day price */}
          <p className="pizza-of-the-day-price">
            From: <span>{intl.format(pizzaOfTheDay.sizes.S)}</span>
          </p>
        </div>
        {/* pizza of the day image */}
        <img
          className="max-w-[200px] border border-border"
          src={pizzaOfTheDay.image}
          alt={pizzaOfTheDay.name}
        />
      </div>
    </div>
  );
};

export default PizzaOfTheDay;