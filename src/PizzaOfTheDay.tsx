// import { usePizzaOfTheDay } from "./usePizzaOfTheDay";
import { useGetPizzaOfTheDayQuery } from "./api/pizzaApi";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PizzaOfTheDay = () => {
  const { data: pizzaOfTheDay } = useGetPizzaOfTheDayQuery();

  if (!pizzaOfTheDay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-t border-border mt-[50px] w-full">
      <h2>Pizza of the Day</h2>
      <div className="flex items-center justify-center">
        <div className="mr-[30px] leading-[2] text-center">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>
          <p>
            From: <span>{intl.format(pizzaOfTheDay.sizes.S)}</span>
          </p>
        </div>
        <img
          className="max-w-[200px] rounded-[5px] border border-border"
          src={pizzaOfTheDay.image}
          alt={pizzaOfTheDay.name}
        />
      </div>
    </div>
  );
};

export default PizzaOfTheDay;