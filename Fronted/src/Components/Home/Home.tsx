import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LinkMutation} from "../../type.ts";
import {fetchLinkPost, fetchLinks, fetchOneLink} from "./LinksThunks.ts";
import {linksState, linkState, loadingState} from "./LinksSLice.ts";
import Spinner from "../Spinner/Spinner.tsx";


const emptyState:LinkMutation = {
    link:"",
}


const Home = () => {
    const [newLink, setNewLink] = useState<LinkMutation>(emptyState);
    const dispatch = useDispatch();
    const loading = useSelector(loadingState);
    const links = useSelector(linksState);
    const link = useSelector(linkState)
    console.log(link)
    console.log(links)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLink((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const onSend = async(event:React.FormEvent) => {
        event.preventDefault();
        await dispatch(fetchLinkPost(newLink));
        await dispatch(fetchLinks());
    }

    const onAnotherSite = async (id:string) => {
        console.log(id)
        await dispatch(fetchOneLink(id));
    }
    const lastLink = links.length > 0 ? links[links.length - 1] : null;

    return (
        <div>
            <h1>Shorten your link</h1>
            <form onSubmit={onSend}>
                <div className="input-group input-group-lg">
                    <input type="text"
                           className="form-control mt-5"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           name="link"
                           onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-danger mt-5 mb-5">SHORTEN</button>
            </form>

            <div>
                {loading ? (
                    <Spinner />
                ) : (
                    lastLink ? (
                        <div className="mt-5">
                            <h4>Последняя ссылка:</h4>
                            <p onClick={() => onAnotherSite(lastLink._id)}>'http://localhost/${lastLink.shortLink}'</p>
                        </div>
                    ) : (
                        <Spinner />
                    )
                )}
            </div>
        </div>
    )
};

export default Home;