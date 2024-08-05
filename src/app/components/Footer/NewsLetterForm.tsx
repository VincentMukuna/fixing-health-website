'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const newsletterFormSchema = z.object({
  email: z.string().email(),
})
export default function NewsLetterForm() {
  const form = useForm<z.infer<typeof newsletterFormSchema>>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof newsletterFormSchema>) => {
    toast.success('Success!', { description: 'Subscribed to newsletter' })
  }
  return (
    <div className="space-y-2 ">
      <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex sm:flex-row sm:items-baseline gap-2 flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="max-w-lg flex-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm">
              Subscribe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
