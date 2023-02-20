import React from "react";
import Image from "next/image";
import Link from "next/link";

const AllEvents = ({ data }) => {
  return (
    <div className="events_page">
      {data?.map((ev) => (
        <Link className="card" key={ev.id} href={`/events/${ev.id}`} passHref>
          <Image
            src={ev.image}
            alt={ev.title}
            // fill={true}
            width={375}
            height={375}
          />
          <h2>{ev.title} </h2>
        </Link>
      ))}
    </div>
  );
};

export default AllEvents;
