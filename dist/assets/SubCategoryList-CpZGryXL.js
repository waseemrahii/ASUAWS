import{R as c,r as l,j as a,A as o,c as b,b as u,T as g}from"./index-dVrRt-9J.js";const m=c.memo(({subCategories:i,handleDelete:r,handleEdit:s})=>{const n=l.useMemo(()=>[{key:"_id",label:"ID",render:e=>`SS${e._id.substring(0,6)}`},{key:"name",label:"Sub Category Name"},{key:"mainCategory",label:"Main Category",render:e=>{var t;return((t=e==null?void 0:e.mainCategory)==null?void 0:t.name)||"No Main Category"}},{key:"priority",label:"Priority",render:e=>e.priority||"0"},{key:"actions",label:"Actions",render:e=>a.jsxs("div",{className:"d-flex gap-2 justify-content-center",children:[a.jsx(o,{onClick:()=>s(e),icon:b,className:"ml-4 border-green-500"}),a.jsx(o,{onClick:()=>r(e._id),icon:u,className:"ml-4"})]})}],[r,s]);return a.jsx(g,{title:"Sub Categories",imageSrc:"/top-selling-product-icon.png",tableTitle:"Sub Sub Categories List",listData:i,columns:n,fetchListData:()=>{},searchPlaceholder:"Search sub sub categories...",itemKey:"_id",itemsPerPage:10})});export{m as default};
