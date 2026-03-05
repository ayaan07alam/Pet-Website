import { useState, useRef } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';

export default function ImageUploader({ onUploadSuccess, currentImage }: { onUploadSuccess: (url: string) => void, currentImage?: string }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'pets');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (res.ok && data.url) {
                setPreview(data.url);
                onUploadSuccess(data.url);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image. Make sure the Supabase Storage bucket "public_images" is public and accepts uploads.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {preview ? (
                <div style={{ position: 'relative', width: '100%', height: 200, borderRadius: 12, overflow: 'hidden', border: '1px solid #ddd' }}>
                    <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                        type="button"
                        onClick={() => { setPreview(null); onUploadSuccess(''); }}
                        style={{ position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        width: '100%', height: 160, borderRadius: 12, border: '2px dashed #C97D0E',
                        backgroundColor: 'rgba(201,125,14,0.05)', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', cursor: uploading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s', color: '#C97D0E'
                    }}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault();
                        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
                    }}
                >
                    {uploading ? <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} /> : <UploadCloud size={32} />}
                    <div style={{ marginTop: 12, fontWeight: 600, fontSize: 14 }}>{uploading ? 'Uploading...' : 'Click or Drag Image Here'}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>PNG, JPG, WEBP (Max 5MB)</div>
                </div>
            )}
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    );
}
