import styles from "./trending-card.module.css";

export const TrendingCard = () => {
  return (
    <div className="flex">
      <div
        className={`block w-64 h-56 p-6 rounded-lg shadow-lg ${styles.cardContainer}`}
      >
        <div className="flex flex-col justify-end h-full overflow-hidden">
          <h5 className="mb-2 text-xl font-medium leading-tight text-white">
            Card title
          </h5>
          <p className="overflow-hidden text-base text-white text-ellipsis whitespace-nowrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            architecto ex facere ducimus! Sunt ab, dicta natus maxime et
            delectus voluptatem obcaecati fuga deserunt suscipit quam officiis
            recusandae nesciunt accusantium fugiat sit labore quae voluptatibus
            ducimus assumenda. Iure nulla magni neque quae est repellendus,
            voluptatibus tempore eum ab maiores ex, consequuntur sequi animi
            veniam nemo asperiores sed? Qui nisi eligendi cumque. Maiores
            perspiciatis nemo tempora magni ad consequatur deserunt quam dolor
            expedita fugit, illo, sed quia ratione possimus a iusto mollitia
            quae, rem et labore sapiente eaque odio? Nostrum beatae accusantium
            amet maxime aut quo natus quam eius delectus similique.
          </p>
        </div>
      </div>
    </div>
  );
};
