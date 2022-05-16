const BookCard = ({ data }) => {
  return (
    <div className="book-card">
      <img src={data.imgURL} alt="book" />
      <div>
        <h3>{data.name}</h3>
        <p>{data.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
