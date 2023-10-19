import {create} from 'zustand'; 

interface ActivelistStore{
    members:string[]; 
    add:(id:string)=>void; 
    remove:(id:string)=>void; 
    set:(ids:string[])=>void;
} 

const useActivelist = create<ActivelistStore>((set)=>({
    members:[], 
    add:(id)=>set((state)=>({members:[...state.members, id]})), 
    remove:(id)=>set((state)=>({members:state.members.filter((memberid)=>memberid !==id)})), 
    set:(ids)=>set({members:ids})
})); 

export default useActivelist;