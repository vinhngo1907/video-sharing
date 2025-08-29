import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../redux/features/videoSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import SidebarNav from "../../Components/SideBarNav";
import LoadingSpinner from "../../Components/LoadingSpinner/spinner";
import VideoComponent from "../../Components/Video";

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isFetching, videos, errorFetching } = useSelector(
        (state: RootState) => state.video
    );
    // const  = useAppSelector((state: RootState) => state.video.);

    const appUser = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (appUser?.currentUser?.id) {
            dispatch(fetchVideos(appUser.currentUser.id));
        }
    }, [appUser?.currentUser?.id, dispatch]);

    return (
        <div className="flex gap-[20px] flex-wrap sm:flex-nowrap">
            <div className="sticky top-16 left-0 z-50 sm:h-[80vh]">
                <SidebarNav />
            </div>

            <div className="videos-section justify-center mt-8">
                {errorFetching && (
                    <p className="text-red-500">{errorFetching}</p>
                )}

                {!isFetching && videos.length === 0 && !errorFetching ? (
                    <img
                        src="/images/img404.png"
                        alt="No videos"
                        className="h-full w-full"
                    />
                ) : (
                    videos.map((video: any) => (
                        <VideoComponent video={video} key={video.id} />
                    ))
                )}
            </div>
            {isFetching && <LoadingSpinner />}
        </div>
    );
};

export default Home;
