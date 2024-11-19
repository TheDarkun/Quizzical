import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { isPasswordValid, validateEmail } from "@/helpers/AccountHelper.js"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {useLocalStorage} from "@/hooks/useLocalStorage.js";

export const Register = () => {
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken");
    const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            repeatedPassword: ""
        },
        mode: "onSubmit",
    })

    const onSubmit = async (data) => {
        if (!validateEmail(data.email)) {
            form.setError("email", { type: "manual", message: "Email musí být platný." })
        }

        const passwordValid = isPasswordValid(data.password)
        if (!passwordValid.isValid) {
            form.setError("password", { type: "manual", message: passwordValid.error })
        } else if (data.password !== data.repeatedPassword) {
            form.setError("repeatedPassword", { type: "manual", message: "Hesla se musí shodovat." })
        }

        if (!form.formState.errors.email && !form.formState.errors.password && !form.formState.errors.repeatedPassword) {
            try {
                const response = await axios.post("http://localhost:5006/user/register", {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    repeatedPassword: data.repeatedPassword
                })

                if (response.status === 200) {
                    try {
                        const response = await axios.post("http://localhost:5006/user/login", {email: data.email, password: data.password});

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
                    navigate("/")
                }
            } catch (error) {
                if (error.response.data === "email is taken") {
                    setError("Tento email už někdo používá.")
                }
                else if (error.response.data === "name is taken") {
                    setError("Toto jméno už někdo používá.")
                }
                else {
                    setError("Něco se pokazilo.")
                }
            }
        }
    }

    return (
        <>
            <section className="absolute z-0 w-full h-full flex items-center justify-center">
                <Card className="w-[400px] p-4">
                    <CardHeader>
                        <CardTitle>Registrace</CardTitle>
                        <CardDescription>Zadejte své informace pro vytvoření účtu</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    name="name"
                                    control={form.control}
                                    rules={{ required: "Jméno je povinné." }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Jméno</FormLabel>
                                            <FormControl>
                                                <Input placeholder="darkun68" {...field} autoComplete="username" />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.name && form.formState.errors.name.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="email"
                                    control={form.control}
                                    rules={{ required: "Email je povinný." }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="joedoe@example.com" {...field} autoComplete="email" />
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
                                                <Input type="password" {...field} autoComplete="new-password" />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.password && form.formState.errors.password.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="repeatedPassword"
                                    control={form.control}
                                    rules={{ required: "Potvrzení hesla je povinné." }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Potvrdit Heslo</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} autoComplete="new-password" />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.repeatedPassword && form.formState.errors.repeatedPassword.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                {error !== null && <p className="text-destructive mt-3">{error}</p>}
                                <Button type="submit" className="w-full mt-4">Zaregistrovat se</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}
