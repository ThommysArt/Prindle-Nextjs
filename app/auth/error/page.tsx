import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoCircledIcon, PersonIcon } from "@radix-ui/react-icons";
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import Link from "next/link";


export default function SignUpPage() {
  return (
    <Card>
        <CardHeader>
          <CardTitle className="flex text-center justify-center items-center text-2xl font-bold space-x-3">
            <PersonIcon className="h-6 w-6 mr-3"/> 
            Authentication Error
          </CardTitle>
          <CardDescription>An Error occured during the authentication process</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <InfoCircledIcon />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              If you did not have an account you should sign-up. If you did, please go ahead and try again.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button>
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </CardFooter>
    </Card>
  )
}