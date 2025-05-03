import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
const PropertyList = () => {
  const { data, loading } = useFetch("hotels/countByType");
  const images = [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D",
    "https://media.istockphoto.com/id/1299604046/photo/interior-of-reception-co-sharing-office-cafe-area-lot-in-day-time.webp?b=1&s=612x612&w=0&k=20&c=HHObxrFjWeImCRtNEqy7QoCt9cECyC77tu2yez0WbH0=",
    "https://cdn.pixabay.com/photo/2024/05/20/11/11/ai-generated-8774912_1280.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yD-q1NsyeqEBotrL5edsQ2Y3mfSybAgCbuVlUw5UsHhC75qP9Z7SwpjwGa-P0ewE3RA&usqp=CAU",
    "https://image-tc.galaxy.tf/wijpeg-183gqhua9y322yvbmwwbd3xy5/suha-creek-hotel-apartments_standard.jpg?width=280&height=280&crop=106%2C0%2C1708%2C1281",
    // {
    //   ImageUrl: data.photos[0],
    //   countOfProperty: data.hotels,
    // },
    // {
    //   ImageUrl: data.photos[0],
    //   countOfProperty: data.villas,
    // },
    // {
    //   ImageUrl: data.photos[0],
    //   countOfProperty: data.cabins,
    // },
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
