import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonIcon } from "@radix-ui/react-icons";
import { signOut } from "@/auth";


export default function SignUpPage() {
  return (
    <Card>
      <form
        action={async (formData) => {
          "use server"
          await signOut()
        }}
      >
        <CardHeader>
          <CardTitle className="flex text-center justify-center items-center text-2xl font-bold space-x-3">
            <PersonIcon className="h-6 w-6 mr-3"/>
            Sign Out
          </CardTitle>
          <CardDescription>Are you sure you want to sign out?</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" variant="destructive">Sign Out</Button>
        </CardFooter>
      </form>
    </Card>
  )
}