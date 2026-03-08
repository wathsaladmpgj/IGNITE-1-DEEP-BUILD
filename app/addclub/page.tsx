// app/addclub/page.tsx
import AddClubForm from "@/app/addclub/page";

export default function AdminAddClubPage() {
  return (
    // You control the layout here on the parent page!
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12">
      <AddClubForm />
    </div>
  );
}