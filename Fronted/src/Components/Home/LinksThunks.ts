import {createAsyncThunk} from "@reduxjs/toolkit";
import {LinkMutation, Url} from "../../type.ts";
import axiosApi from "../../AxiosApi/AxiosApi.ts";

export const fetchLinkPost = createAsyncThunk<void,LinkMutation>(
    'links/fetchLinksPost',
    async (newLink) => {
        const response = await axiosApi.post<Url>('/url',newLink);
        return response.data;
    }
);

export const fetchLinks = createAsyncThunk<Url[]>(
    'links/fetchLinks',
    async () => {
        const response = await axiosApi.get<Url[] | null>('/url');
        return response.data ?? [];
    }
);

export const fetchOneLink = createAsyncThunk<Url,string>(
    "links/fetchOneLink",
    async (id:string) => {
        const response = await axiosApi.get<Url | null>(`/url/my-short-link/${id}`);
        return response.data

    }
);