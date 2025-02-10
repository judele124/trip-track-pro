import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import useAxios from "@/hooks/useAxios";
import useIdFromParamsOrNavigate from "@/hooks/useIdFromParamsOrNavigate";
import { navigationRoutes } from "@/Routes/routes";
import { tripGet } from "@/servises/tripService";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Types } from "trip-track-package";

export default function BeforeJoinTripView() {
  const { activate, data, status, loading, error } = useAxios({ manual: true });
  const tripId = useIdFromParamsOrNavigate(navigationRoutes.notFound);

  useEffect(() => {
    if (!tripId) return;
    tripGet(activate, tripId);
  }, [tripId]);

  if (!status || loading || error) {
    return <p>{loading ? "Loading..." : error?.message}</p>;
  }

  const { name, description, reward }: Types["Trip"]["Model"] = data;
  console.log(reward?.image);

  // return (
  //   <div className="flex flex-col gap-2">
  //     <Logo />
  //     <div className="my-4 flex flex-col gap-2">
  //       <h4 className="text-pretty">
  //         You're about to join the <strong>{name}</strong> trip
  //       </h4>
  //       <p className="max-h-[40vh] overflow-y-scroll whitespace-pre-line break-words">
  //         {description}
  //       </p>
  //       {reward && reward.image && (
  //         <>
  //           <p className="text-sm font-semibold">Reward: {reward.title}</p>
  //           <img
  //             className="size-1/2 object-contain p-3"
  //             src={reward.image as unknown as string}
  //             alt=""
  //           />
  //         </>
  //       )}
  //     </div>
  //     <div>
  //       <Button primary className="mb-1 w-full">
  //         <Link to={`${navigationRoutes.trip}?tripId=${tripId}`}>
  //           Join the trip
  //         </Link>
  //       </Button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 px-1">
        <h1>Join the trip {name}</h1>

        <div className="flex-none rounded-xl bg-white/15 p-3">
          <h5 className="-mt-5 w-fit rounded-lg bg-secondary p-1 px-2 shadow-md shadow-primary">
            About
          </h5>
          <p
            style={{ scrollbarWidth: "none" }}
            className="mt-3 line-clamp-3 overflow-y-scroll text-sm"
          >
            {
              "Join us on an unforgettable 14-day journey through the majestic Himalayas. Experience breathtaking mountain views, ancient monasteries, and vibrant local culture. Trek to Everest Base Camp and immerse yourself in Sherpa culture."
            }
          </p>
        </div>

        {reward && reward.image && (
          <div className="flex-none rounded-xl bg-secondary p-3">
            <h5 className="-mt-5 text-sm font-medium">Reward</h5>
            <p className="mt-3 text-sm font-medium">{reward.title}</p>
            <div className="relative h-32 overflow-hidden rounded-lg">
              <img
                src={reward.image as unknown as string}
                alt={reward.title}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <Button primary className="w-full">
        <Link to={`${navigationRoutes.trip}?tripId=${tripId}`}>Join</Link>
      </Button>
    </div>
  );
}
