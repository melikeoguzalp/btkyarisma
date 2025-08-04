
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhishGuardLogo } from "@/components/phishguard-logo";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [profession, setProfession] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const age = formData.get('age') as string;
    const currentProfession = formData.get('profession') as string;
    
    // Base user profile for localStorage
    const userProfile: { [key: string]: any } = {
        name,
        email,
        profession: currentProfession,
        age: age ? parseInt(age) : null,
        uid: `local-${Date.now()}` // Simple unique ID for local usage
    };
    
    // Add profession-specific fields
    if (currentProfession === 'student') {
        userProfile.school = formData.get('school') as string;
        userProfile.department = formData.get('department') as string;
    } else if (currentProfession === 'employee') {
        userProfile.jobTitle = formData.get('jobTitle') as string;
    } else if (currentProfession === 'retired') {
        userProfile.retirementPlace = formData.get('retirementPlace') as string;
    }

    try {
        // Store user profile in localStorage
        localStorage.setItem('user', JSON.stringify(userProfile));

        // Initialize user stats in localStorage
        localStorage.setItem('userStats', JSON.stringify({
            reportsAnalyzed: 0,
            gameScore: 0,
            completedStories: [],
        }));
      
        // Redirect to login page after successful registration
        router.push('/login');

    } catch (err: any) {
        console.error(err);
        setError(`An unexpected error occurred: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background py-8">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
           <div className="mx-auto mb-4">
            <PhishGuardLogo />
          </div>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Fill in the details below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Registration Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" placeholder="25" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="For demo purposes, not stored" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
                <Select name="profession" required onValueChange={setProfession}>
                  <SelectTrigger id="profession">
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            {profession === 'student' && (
              <>
                <div className="space-y-2 animate-in fade-in">
                  <Label htmlFor="school">School</Label>
                  <Input id="school" name="school" type="text" placeholder="e.g., Istanbul University" />
                </div>
                <div className="space-y-2 animate-in fade-in">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" type="text" placeholder="e.g., Computer Engineering" />
                </div>
              </>
            )}

            {profession === 'employee' && (
              <div className="space-y-2 animate-in fade-in">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" name="jobTitle" type="text" placeholder="e.g., Software Engineer" />
              </div>
            )}


            {profession === 'retired' && (
              <div className="space-y-2 animate-in fade-in">
                <Label htmlFor="retirementPlace">Retired From (Institution)</Label>
                <Input id="retirementPlace" name="retirementPlace" type="text" placeholder="e.g., Social Security Institution" />
              </div>
            )}


            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
