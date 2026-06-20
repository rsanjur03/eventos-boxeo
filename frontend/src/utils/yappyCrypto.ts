/**
 * Genera un HMAC SHA-256 compatible con Yappy usando Web Crypto API (Cloudflare)
 */
export async function generateYappySignature(orderId: string, subtotal: string, taxes: string, total: string, secretKey: string): Promise<string> {
  const dataString = `${orderId}${subtotal}${taxes}${total}`;
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretKey);
  const messageData = encoder.encode(dataString);

  // Importar la llave secreta
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Firmar el mensaje
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    messageData
  );

  // Convertir a Hexadecimal (Requisito de Yappy)
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const hexSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hexSignature;
}
