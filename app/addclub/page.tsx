// app/addclub/page.tsx
import AddClubForm from "@/app/components/AddClubForm"; // Adjust path if needed

export default function AdminAddClubPage() {
  return (
    // You define the page layout here, and the component will inherit the centering
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12">
      <AddClubForm />
    </div>
  );
}