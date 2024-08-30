import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../Redux/store.ts";
import {Url} from "../../type.ts";
import {fetchLinkPost, fetchLinks, fetchOneLink} from "./LinksThunks.ts";


export interface Link {
    links:Url[];
    link?:Url | []
    loading:boolean;
    error:boolean;
}


export const initialState:Link = {
    links:[],
    link:[],
    loading:false,
    error:false,
}

export const LinksSlice = createSlice<Link>({
    name:"links",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchLinkPost.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchLinkPost.fulfilled,(state) => {
            state.loading = false;
        });
        builder.addCase(fetchLinkPost.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(fetchLinks.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchLinks.fulfilled,(state,action:PayloadAction<Url[]>) => {
            state.loading = false;
            state.links = action.payload
        });
        builder.addCase(fetchLinks.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(fetchOneLink.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchOneLink.fulfilled,(state,action:PayloadAction<Url>) => {
            state.loading = false;
            state.link = action.payload
        });
        builder.addCase(fetchOneLink.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });

    }
});

export const LinksReducer = LinksSlice.reducer;
export const linksState = (state: RootState) => state.links.links;
export const linkState = (state: RootState) => state.links.link;
export const loadingState = (state: RootState) => state.links.loading;