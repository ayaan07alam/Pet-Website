import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
    title: 'Admin Dashboard | Rumzee\'s Exotics',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FDF6EC' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: 40, height: '100vh', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}
