// import Image from "next/image";

// const EventPage = ({ data }) => {
//   console.log(data);
//   return (
//     <div>
//       <Image src={data.image} width={1000} height={500} alt={data.title} />
//       <h1>{data.title}</h1>
//       <p>{data.description}</p>
//     </div>
//   );
// };

// export default EventPage;

// export async function getStaticPaths() {
//   // we want to go through the allEvents array inside the data.json file
//   const data = await import("/data/data.json");
//   const allEvents = data.allEvents;
//   const allPaths = allEvents.map((path) => {
//     return {
//       params: {
//         cat: path.city,
//         // here we name this id (left one) because we called this file [id], if it was [hello] we'd name the below as hello
//         id: path.id,
//       },
//     };
//   });
//   return {
//     paths: allPaths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   const id = context.params.id;
//   const { allEvents } = await import("/data/data.json");
//   const eventData = allEvents.find((ev) => id === ev.id);

//   return {
//     props: { data: eventData },
//   };
// }

import SingleEvent from "../../../src/components/events/single-event";

const EventPage = ({ data }) => <SingleEvent data={data} />;

export default EventPage;

export async function getStaticPaths() {
  const data = await import("/data/data.json");
  const allEvents = data.allEvents;

  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context.params.id;
  const { allEvents } = await import("/data/data.json");
  const eventData = allEvents.find((ev) => id === ev.id);

  return {
    props: { data: eventData },
  };
}
