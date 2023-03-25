import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// DONE: Implement the fileStogare logic

export class AttachmentUtils {
  constructor(
    // private readonly s3Client: Types = new XAWS.S3({ signatureVersion: 'v4' }),
    private readonly bucketName = process.env.ATTACHMENTS_S3_BUCKET,
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION,
    private readonly isOffline = process.env.IS_OFFLINE
  ) {}

  getPresignedAttachmentUrl(todoId: string): string {
    let options: AWS.S3.Types.ClientConfiguration = {
      signatureVersion: 'v4'
    }

    if (this.isOffline) {
      options = {
        ...options,
        s3ForcePathStyle: true,
        endpoint: 'http://localhost:4569'
      }
    }

    const s3Client = new XAWS.S3(options)
    return s3Client.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: todoId,
      Expires: this.urlExpiration
    })
  }
}
