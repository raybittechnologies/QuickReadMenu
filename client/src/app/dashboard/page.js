"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyBusiness } from "@/app/utils/api";
import Button from "../components/Button";
import { BASE_URI } from "../utils/constants";
import Image from "next/image";

const Dashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await getMyBusiness();
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
        setBusinesses(data);
      } catch (error) {
        console.error("Failed to fetch businesses", error);
      }
    };
    fetchBusinesses();
  }, []);

  const handleClick = (id) => {
    router.push(`/UserProfile`);
  };

  const handleAddBusiness = () => {
    router.push("/getStarted");
  };

  return (
    <>
      <div className="p-6 bg-amber-50 h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Businesses</h2>
          <Button
            onClick={handleAddBusiness}
            text=" Add Business"
            variant="primary"
          />
        </div>
        {businesses.length === 0 ? (
          <p className="text-3xl text-center font-semibold">
            No Business Found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((biz) => (
              <div
                key={biz.id}
                className="rounded-lg shadow hover:scale-98 duration-300 hover:shadow-lg transition cursor-pointer overflow-hidden"
                onClick={() => handleClick(biz.id)}
              >
                {biz.banner && (
                  <Image
                    src={`${BASE_URI}${biz.banner}`}
                    alt="Banner"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-32 object-cover"
                  />
                )}

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {biz.logo && (
                      <Image
                        src={`${BASE_URI}${biz.logo}`}
                        alt="Logo"
                        width={12}
                        height={12}
                        sizes="100vw"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <h3 className="text-lg text-black font-bold truncate">
                      {biz.businessName}
                    </h3>
                  </div>

                  <p className="text-black text-md truncate mb-2">
                    {biz.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
