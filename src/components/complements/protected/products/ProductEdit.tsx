import { useParams } from "react-router-dom"
import { API_URL, QUERY_KEY_CATEGORIES, QUERY_KEY_PRODUCTS } from "../../../../consts/consts";
import { fetchCategories, fetchCategory } from "../../../../functions/fetchData";
import { useQuery } from "react-query";
import { CategoriesInterface, ProductsInterface } from "../../../../interfaces/interfaces";
import { useMutation} from "react-query"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import "./styles.css"
import Loader from "../../../loader/Loader";


function ProductEdit(){
    
    const {id} = useParams();

    const url = `products/${id}`
    

    const { data: categories, status: categoriesStatus, error: categoriesError}: { data?: any, status: string, error: any } = useQuery(
        QUERY_KEY_CATEGORIES,
        fetchCategories
    ) 
    
    const {data,status, error}:
    {data: any, status: string, error: any} = 
    useQuery([QUERY_KEY_PRODUCTS, id], () => {          
        return fetchCategory(url);
    });

    const [title, setTitle] = useState<string>(data?.title || "");
    const [price, setPrice] = useState<number>(data?.price || 0);
    const [description, setDescription] = useState<string>(data?.description || "");
    const [category, setCategory] = useState<CategoriesInterface>(data?.category || "");
    const [images, setImages] = useState<string[]>(data?.images || ["https://placehold.co/300x300/EEE/31343C"]); 
    const idProduct = data?.id; 

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/products";

    const editProductMutation = useMutation(
        (data: ProductsInterface) => {            
            return axios.put(`${API_URL}/${QUERY_KEY_PRODUCTS}/${id}`, data)
        },
        {
            onSuccess: () => {    
                navigate(from, { replace: true});                
            },
        }       
                
    )

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const newProduct: ProductsInterface = {
            title,
            price,
            description,
            images,
            category,
            id: idProduct
        };

        editProductMutation.mutate(newProduct);

    }

    return(
        <div className="container-categories-create">
            <form onSubmit={handleSubmit}>
                {status === "loading" && <Loader/>}                
                {status === "error" && <h1>Error: {error.message}</h1>}      
                {status === "success" && 
                    <>
                        <input type="text" name="title" defaultValue={data.title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="number" name="price" defaultValue={data.price} onChange={(e) => setPrice(parseInt(e.target.value))} />
                        <input type="text" name="description" defaultValue={data.description} onChange={(e) => setDescription(e.target.value)} />

                        <select name="categoryId" value={category.id} onChange={(e) => setCategory({...category, id: parseInt(e.target.value)})}>
                            
                            {categoriesStatus === "loading" && <Loader/>}                
                            {categoriesStatus  === "error" && <h1>Error: {categoriesError?.message}</h1>}      
                            {categoriesStatus  === "success" &&          
                                categories?.map((cat: CategoriesInterface) => {
                                    return(
                                        <option value={cat.id}>{cat.name}</option>                        
                                    )
                            })}
                        </select>         
                                      
                        {data.images.map((i: string, index: number) => {
                            return (
                                <input
                                    key={index}
                                    type="url"
                                    name="images"
                                    defaultValue={i}
                                    onChange={(e) => {
                                        const updatedImages = [...images];
                                        updatedImages[index] = e.target.value;
                                        setImages(updatedImages);
                                    }}
                                />
                            );
                        })}
                        
                         
                        <button>Editar</button>
                    </>
                }
            </form>
        </div>
    )
}

export default ProductEdit