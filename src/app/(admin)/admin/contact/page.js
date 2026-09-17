import { createClient } from '@/lib/supabase/server';
import ContactPageForm from '@/components/admin/ContactPageForm';

export default async function AdminContactPage() {
  const supabase = createClient();

  const { data: contact } = await supabase
    .from('contact_page')
    .select('*')
    .limit(1)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Contact Page
      </h1>

      <ContactPageForm contact={contact} />
    </div>
  );
}