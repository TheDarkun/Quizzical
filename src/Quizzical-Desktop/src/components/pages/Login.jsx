import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {isPasswordValid, validateEmail} from "@/helpers/AccountHelper.js";
import {usePost} from "@/hooks/useFetch.js";
import axios from "axios";
import {useLocalStorage} from "@/hooks/useLocalStorage.js";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [error, setError] = useState(null);
    
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken");
    const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");

    const navigate = useNavigate();
    
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });
    
    const onSubmit = async (data) => {

        if (!validateEmail(data.email)) {
            form.setError("email", {type: "manual", message: "Email musí být platný."});
        }

        const passwordValid = isPasswordValid(data.password);
        if (!passwordValid.isValid) {
            form.setError("password", {type: "manual", message: passwordValid.error});
        }

        if (!form.formState.errors.email && !form.formState.errors.password) {
            try {
                const response = await axios.post("http://localhost:5006/user/login", data);

                if (response.status === 200) {
                    setJwtToken(response.data["jwtToken"]);
                    setRefreshToken(response.data["refreshToken"]);
                    navigate("/");
                }
            } catch (error) {
                if (error.response.data === "user does not exist") {
                    setError("Tento uživatel neexistuje.");
                } else {
                    setError("Něco se pokazilo.")
                }
            }
        }
    };
    
    return (
        <>
            <section className="absolute z-0 w-full h-full flex items-center justify-center">
                <Card className="w-[400px] p-4">
                    <CardHeader>
                        <CardTitle>Přihlášení</CardTitle>
                        <CardDescription>Zadejte svůj e-mail a heslo níže pro přihlášení do svého účtu.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    name="email"
                                    control={form.control}
                                    rules={{ required: "Email je povinný." }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="joedoe@example.com" {...field} autoComplete="email"/>
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.email && form.formState.errors.email.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="password"
                                    control={form.control}
                                    rules={{ required: "Heslo je povinné." }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Heslo</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} autoComplete="current-password"/>
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.password && form.formState.errors.password.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                {error !== null && <p className="text-destructive mt-3">{error}</p>}
                                <Button type="submit" className="w-full mt-4">Přihlásit se</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}

