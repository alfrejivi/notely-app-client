import { Storage } from 'aws-amplify';

const s3Upload = async (file: File) => {
    const filename = `${Date.now()}-${file.name}`;

    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });

    return stored;
}

export { s3Upload };