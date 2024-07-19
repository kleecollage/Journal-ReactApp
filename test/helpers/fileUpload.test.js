import { expect } from "@jest/globals";
import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'cloudinaryahs',
    api_key: '736358749785698',
    api_secret: 'g7HcySq0Z0x1cCVJNw11MaVDgGI',
    secure: true
})

describe('Pruebas en helper fileUpload', () => { 
    // ************************************************************* //
    test('debe subir el archivo correctamente a cloudinary', async () => {
        const imgaeUrl = 'https://cdn.elitebabes.com/content/200528/0002-13_1800.jpg';
        const resp = await fetch(imgaeUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'Elitebabes.jpg')
        const url = await fileUpload(file);
        
        const segments = url.split('/');
        const publicId = segments[segments.length - 1].replace('.jpg', '')
        // console.log(url);
        // console.log(publicId);
        const cloudResp = await cloudinary.api.delete_resources([publicId], {
            resource_type:'image'
        });
        // console.log({cloudResp})
        expect(typeof url).toBe('string');
        expect(cloudResp.deleted[publicId]).toBe('deleted');
    });
    // ************************************************************* //
    test('debe retornar null', async() => { 
        const file = new File([], 'img.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null)
     })

 })